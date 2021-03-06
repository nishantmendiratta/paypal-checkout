/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */

import fs from 'fs-extra';

import { webpack_tasks } from '../../webpack.conf';

import { webpackCompile } from './lib/compile';
import { openPage, takeScreenshot } from './lib/browser';
import { dotifyToString } from './lib/util';
import { diffPNG, readPNG, uploadToImgur } from './lib/image';
import { buttonConfigs } from './config';

const CHECKOUTJS_SCRIPT = `${ __dirname }/../../${ webpack_tasks.base.src }`;

const IMAGE_DIR = `${ __dirname }/images`;

const WEBPACK_CONFIG = {
    ...webpack_tasks.base.cfg,
    entry: CHECKOUTJS_SCRIPT
};

const DIFF_THRESHOLD = 20;

const USER_AGENTS = {
    iphone6: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};

jest.setTimeout(50000);

let browser;
let page;

beforeAll(async () => {
    ({ browser, page } = await openPage(await webpackCompile(WEBPACK_CONFIG)));

    for (let filename of await fs.readdir(IMAGE_DIR)) {
        if (filename.endsWith('-old.png')) {
            await fs.unlink(`${ IMAGE_DIR }/${ filename }`);
        }
    }

    await page.evaluate(() => {
        window.paypal.setup({ env: 'test' });
    });
});

afterAll(async () => {
    await browser.close();
});

for (let config of buttonConfigs) {
    let filename = dotifyToString(config) || 'base';

    test(`Render button with ${ filename }`, async () => {
        let filepath = `${ IMAGE_DIR }/${ filename }.png`;
        let diffpath  = `${ IMAGE_DIR }/${ filename }-old.png`;

        let { x, y, width, height } = await page.evaluate((options, userAgents) => {

            // $FlowFixMe
            document.body.innerHTML = '';

            let container = window.document.createElement('div');
            window.document.body.appendChild(container);

            if (options.container) {
                container.style.width = `${ options.container.width }px`;
            }

            if (options.userAgent) {
                window.navigator.mockUserAgent = userAgents[options.userAgent];
            }

            window.paypal.Button.render(Object.assign({
                payment() { /* pass */ },
                onAuthorize() { /* pass */ }
            }, options.button), container);

            let rect = container.querySelector('iframe').getBoundingClientRect();

            delete window.navigator.mockUserAgent;

            return {
                x:      rect.left,
                y:      rect.top,
                width:  rect.width,
                height: rect.height
            };

        }, config, USER_AGENTS);

        let existingExists = await fs.exists(filepath);

        let [ screenshot, existing ] = await Promise.all([
            takeScreenshot(page, { x, y, width, height }),
            existingExists ? readPNG(filepath) : null
        ]);

        if (existing) {
            let delta = await diffPNG(screenshot, existing);

            if (delta > DIFF_THRESHOLD) {
                await existing.write(diffpath);
                await screenshot.write(filepath);

                let imgurUrl = '';

                if (process.env.TRAVIS) {
                    imgurUrl = await uploadToImgur(filepath);
                }
                
                throw new Error(`Button style changed with delta of ${ delta } for configuration:\n\n${ JSON.stringify(config, null, 4) }\n\nSee ${ diffpath } or ${ imgurUrl || '' }`);
            }

        } else {
            await screenshot.write(filepath);
        }
    });
}
