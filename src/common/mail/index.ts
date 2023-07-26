import * as SendGrid from '@sendgrid/mail';

if (process.env.SENDGRID_KEY) SendGrid.setApiKey(process.env.SENDGRID_KEY);

export default SendGrid;
