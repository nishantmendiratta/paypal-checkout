/* @flow */

import { BUTTON_BRANDING, BUTTON_SHAPE, BUTTON_LAYOUT, BUTTON_NUMBER, BUTTON_SIZE, BUTTON_LOGO } from '../../../constants';
import { BUTTON_STYLE } from '../../style';

import { CLASS } from './class';

let sizeResponsiveStyle = Object.keys(BUTTON_STYLE).map(size => {
    let style = BUTTON_STYLE[size];

    return `
        @media only screen and (min-width: ${ style.minWidth }px) {

            .${ CLASS.CONTAINER } {
                min-width: ${ style.minWidth }px;
                max-width: ${ style.maxWidth }px;
                font-size: ${ style.fontSize }px;
            }

            .${ CLASS.BUTTON }:not(.${ CLASS.CARD }) {
                height: ${ style.height }px;
            }

            .${ CLASS.BUTTON }.${ CLASS.BRANDING }-${ BUTTON_BRANDING.UNBRANDED } {
                font-size: ${ style.largeFontSize }px;
            }

            .${ CLASS.LOGO } {
                height: ${ style.wordmarkSize }px;
            }

            .${ CLASS.LOGO }.${ CLASS.LOGO }-${ BUTTON_LOGO.PP } {
                height: ${ style.logoSize }px;
            }

            .${ CLASS.BUTTON }.${ CLASS.SHAPE }-${ BUTTON_SHAPE.PILL } {
                border-radius: ${ Math.ceil(style.height / 2) }px;
            }

            .${ CLASS.BUTTON }.${ CLASS.SHAPE }-${ BUTTON_SHAPE.RECT } {
                border-radius: ${ style.rectRadius }px;
            }

            .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.VERTICAL } {
                margin-bottom: ${ style.verticalMargin }px;
            }

            .${ CLASS.CONTAINER }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } .${ CLASS.BUTTON } .${ CLASS.LOGO } {
                height: ${ style.horizontal.wordmarkSize }px;
            }

            .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } .${ CLASS.LOGO }.${ CLASS.LOGO }-${ BUTTON_LOGO.PP } {
                height: ${ style.horizontal.logoSize }px;
            }

            .${ CLASS.SEPARATOR } {
                margin: 0 ${ style.separatorMargin }px;
            }

            .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL } .${ CLASS.SEPARATOR } {
                margin: 0 ${ style.horizontal.separatorMargin }px;
            }

            .${ CLASS.TAGLINE } {
                height: ${ style.taglineHeight }px;
                line-height: ${ style.taglineHeight }px;
            }

            .${ CLASS.FUNDINGICONS } {
                height: ${ style.fundingHeight }px;
            }

            .${ CLASS.CARD } {
                height: ${ style.cardLogoSize }px;
                margin: 0 ${ style.cardLogoMargin }px;
            }

            .${ CLASS.FUNDINGICONS } .${ CLASS.CARD } {
                height: ${ style.fundingLogoSize || style.cardLogoSize };
                margin: ${ ((style.fundingHeight - (style.fundingLogoSize || style.cardLogoSize)) / 2).toFixed(1) }px ${ style.fundingLogoMargin || style.cardLogoMargin }px;
            }
        }

    `;
}).join('\n');

export let buttonResponsiveStyle = `

    ${ sizeResponsiveStyle }

    @media only screen and (max-width: ${ BUTTON_STYLE[BUTTON_SIZE.SMALL].minWidth }px) {

        .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-0 {
            width: 100%;
            margin-right: 0;
        }

        .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-1 {
            display: none;
        }

        .${ CLASS.CONTAINER }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } .${ CLASS.TAGLINE } {
            display: none;
        }
    }

    @media only screen and (min-width: ${ BUTTON_STYLE[BUTTON_SIZE.SMALL].minWidth }px) {

        .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-0 {
            display: inline-block;
            width: calc(50% - 2px);
            margin-right: 4px;
        }

        .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-1 {
            display: inline-block;
            width: calc(50% - 2px);
        }

        .${ CLASS.CONTAINER }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } .${ CLASS.TAGLINE } {
            display: block;
        }
    }
`;
