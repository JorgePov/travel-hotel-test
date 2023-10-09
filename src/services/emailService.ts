import { Resend } from "resend";
const resend = new Resend(process.env.REACT_APP_API_EMAIL);

export const sendReservation = () => {
    resend.emails.send({
        from: "onboarding@resend.dev",
        to: "jpoveda731@gmail.com",
        subject: "Reservacion",
        html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
      });
};
export const sendCancelation = () => {
    resend.emails.send({
        from: "onboarding@resend.dev",
        to: "jpoveda731@gmail.com",
        subject: "Reservacion",
        html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
      });
};
export const sendConfirmation= () => {
    resend.emails.send({
        from: "onboarding@resend.dev",
        to: "jpoveda731@gmail.com",
        subject: "Reservacion",
        html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
      });
};

