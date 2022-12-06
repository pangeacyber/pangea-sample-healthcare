// Import the Pangea SDK
const Pangea = require('node-pangea');

// Read the Pangea Domain and Auth Token from the environment variables
const pangeaDomain = process.env.PANGEA_DOMAIN;
const auditToken = process.env.AUDIT_AUTH_TOKEN;

// Instantiate a Pangea Configuration object with the end point domain
const auditConfig = new Pangea.PangeaConfig({ domain: pangeaDomain });

// Instantiate the Audit Service using the auth token and config
const audit = new Pangea.AuditService(auditToken, auditConfig);

const clientIpAddress = (req) => {
  return (
    req?.headers['origin'] ||
    req?.socket.remoteAddress ||
    'localhost'
  )
}

const hostIpAddress = (req) => {
  return (
    req?.headers['host'] ||
    req?.hostname ||
    'localhost'
  )
}

// Export the reference to the AuditService and convenience functions
module.exports = {audit, clientIpAddress, hostIpAddress}
