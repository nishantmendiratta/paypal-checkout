
import xcomponent from 'xcomponent/src';
import { props } from './props';

export let PayPalCheckout = xcomponent.create({

    tag: 'paypal-checkout',

    defaultEnv: 'production',

    envUrls: {
        local: 'http://localhost.paypal.com:8000/webapps/hermes?ul=0',
        production: 'https://wwww.paypal.com/checkoutnow?ul=0'
    },

    props: props,

    dimensions: {
        width: 450,
        height: 535
    }
});