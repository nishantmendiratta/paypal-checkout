
import paypal from 'src/index';
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

import './tests';

paypal.setup({
    env: 'test'
});

afterEach(() => {
    paypal.xcomponent.destroyAll();
});

patchXmlHttpRequest();

$mockEndpoint.register({
    method: 'POST',
    uri: paypal.config.loggerUri,
    data: {}
}).listen();

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};
