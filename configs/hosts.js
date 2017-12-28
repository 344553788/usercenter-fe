var hosts;

if (process.env.NODE_ENV === 'pro') {
	hosts = {
        servicehost: {
            hostname: 'service.ningxianbw.com',
            port: '8080',
            protocol: 'http'
        },

        businesshost: {
            hostname: 'ningxianbw.com',
            hostip: '60.205.1.104',
            port: '443',
            protocol: 'https'
        }
    }
	
} else { // dev
    hosts = {
        servicehost: {
            hostname: 'geniusgroupcraft.com',
            port: '8080',
            protocol: 'http'
        },

        businesshost: {
            hostname: 'geniusgroupcraft.com',
            hostip: '139.196.108.208',
            port: '3000',
            protocol: 'http'
        }
    }
}

module.exports = hosts;