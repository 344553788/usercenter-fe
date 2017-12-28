var hosts = require('./hosts');
var servicehost = hosts.servicehost;

var serviceurl = {
    accountLevelOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            account_levels: '/account/user/level',
            account_level_update: '/account/user/level/returnList'
        }
    },

    DrawbackRuleOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            deductRate: '/account/cash/commission'
        }
    },

    authenticateOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            register: '/account/users/',
            login: '/account/login'
        }
    },

    homePageOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            home_page: '/shop/web/index'
        }
    },

    ShoppingCartOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            ShoppingCart_list: '/shop/cart',
            ShoppingCart_add: '/shop/cart',
            ShoppingCart_del: '/shop/cart',
            ShoppingCart_clear: '/shop/cart/clear/'
        }
    },

    goodsOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            goods_list: '/shop/web/product',
            goods_detail: '/shop/web/product',
            shop_goods_list: '/shop/web/shop/product'
        }
    },

    shopOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            shop_list: '/shop/web/shop',
            shop_detail: '/shop/web/shop/product'
        }
    },

    myCollectionOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            shop_collection: '',
            goods_collection: ''
        }
    },

    myAddressOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            address_list: '/shop/address/profile',
            address_new: '/shop/address',
            address_update: '/shop/address',
            address_delete: '/shop/address',
            address_detail: '/shop/address/id'
        }
    },

    myTeamOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            account_by_id: '/account/users/',
            account_by_name: '/account/users/',
            account_subjections: '/account/subjections'
        }
    },

    CreateAccountOrderOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            order: '/account/level/orders',
            order_detail: '/account/level/orders',
            recharge_order: '/account/charge/orders'
        }
    },

    mywalletOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            money_summary: '/shop/order/cashback/summary',
            money_details: '/account/trade',
            money_drawback: '/account/cash',
            toGold: '/account/currency/transfer'
        }
    },

    MyRestitutionOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            restitutionRecord: '/shop/order/cashback',
            restitutionDetail: '/shop/order/cashback/record'
        }
    },

    createShopOrderOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            to_order: '/shop/web/toOrder',
            order: '/shop/order'
        }
    },

    AccountOrderOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            order_amount_query: '/account/level/orders/money'
        }
    },

    shopOrderOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            order_list: '/shop/order',
            order_detail: '/shop/order',
            order_create: '/shop/order',
            order_cancel_request: '/shop/order/cancel',
            order_canceled: '/shop/order/canceled/',
            order_done: '/shop/order/finish/',
            order_amount_query: '/shop/order/money',
            order_shipping: '/shop/order/shipping',
            order_agent: '/shop/order/agent',
            order_agent_query: '/shop/order/agent',
            order_agent_cancel: '/shop/order/agent',
            order_agent_payment: '/shop/order/payment'
        }
    },

    paymentOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            prepay: '/payment/v1/prepay',
            prerefund: '/payment/refund/v2/order',
            refund: '/payment/refund/v2'
        }
    },

    accountSettingsOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            user_basicInfo: '/account/users/',
            password_update: '/account/users/password',
            mobile_update: '/account/auth/mobile/verify',
            email_update: '/account/auth/email/verify',
            pid_auth_apply: '/account/auth/identity/apply',
            payment_type_binding: '/account/bank/binding'
        }
    },

    smscodeOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            obtain_smscode: '/account/sendVerifyCode'
        }
    },

    emailCodeOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            obtain_emailcode: '/account/auth/email/apply'
        }
    },

    sellerGoodsMgtOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            goods_category: '/shop/category',
            goods_spec: '/shop/spec/byCate/',
            goods_add: '/shop/product',
            goods_to_edit: '/shop/product/toUpdate/',
            goods_edit: '/shop/product',
            goods_delete: '/shop/product',
            modify_goods_status: '/shop/product/updateStatus',
            shop_goods_list: '/shop/product',
            shop_goods_detail: '/shop/product'
        }
    },

    sellerShopOptions: {
        hostname: servicehost.hostname,
        port: servicehost.port,
        path: {
            basic_settings: '/account/shop'
        }
    }
}

module.exports = serviceurl;
