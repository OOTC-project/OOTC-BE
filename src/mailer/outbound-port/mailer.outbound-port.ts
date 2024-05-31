export const MAILER_OUTBOUND_PORT = 'MAILER_OUTBOUND_PORT' as const;

export interface MailerOutboundPort {
    sendEmailOfResetPassword(email: string, resetPassword: string);
}
