export type infoEmail = {
  hotelName: string;
  startTravel: string;
  finishTravel: string;
  numberRoom: string;
  roomType: string;
  totalPrice: string;
  emailTo: string;
  otherEmail?: string;
};

export const sendReservation = async ({
  hotelName,
  startTravel,
  finishTravel,
  numberRoom,
  roomType,
  totalPrice,
  emailTo,
  otherEmail,
}: infoEmail) => {
  try {
    console.log(
      process.env.REACT_APP_EMAIL_SERVICE,
      process.env.REACT_APP_EMAIL_RED,
      process.env.REACT_APP_API_EMAIL,
      {
        email_to: emailTo,
        subject_text: "Confirmación de Cancelación de Reserva de Hotel",
        other_email: otherEmail,

        titulo: "Confirmación de Cancelación de Reserva de Hotel",
        body_top:
          "Te confirmamos que tu solicitud de cancelación de la reserva de hotel ha sido procesada con éxito.",
        body_down:
          "Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros. esperamos poder servirte en futuras ocasiones.",
        footer: "¡Esperamos que tengas una viaje agradable!",

        hotelName: hotelName,
        startTravel: startTravel,
        finishTravel: finishTravel,
        numberRoom: numberRoom,
        roomType: roomType,
        totalPrice: totalPrice,
      }
    );
    const data = {
      service_id: process.env.REACT_APP_EMAIL_SERVICE,
      template_id: process.env.REACT_APP_EMAIL_INFO,
      user_id: process.env.REACT_APP_API_EMAIL,
      template_params: {
        email_to: emailTo,
        subject_text: "Confirmación de Reserva de Hotel",
        other_email: otherEmail,

        titulo: "Confirmación de Reserva de Hotel",
        body_text: "",
        footer: "¡Esperamos que tengas una viaje agradable!",

        hotelName: hotelName,
        startTravel: startTravel,
        finishTravel: finishTravel,
        numberRoom: numberRoom,
        roomType: roomType,
        totalPrice: totalPrice,
      },
    };

    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.info("¡Tu correo ha sido enviado con éxito!");
        } else {
          console.error("Error al enviar el correo");
        }
      })
      .catch((error) => {
        console.error("Oops... " + error.message);
      });
  } catch (error) {}
};

export const sendCancelation = async ({
  hotelName,
  startTravel,
  finishTravel,
  numberRoom,
  roomType,
  totalPrice,
  emailTo,
  otherEmail,
}: infoEmail) => {
  try {
    console.log(
      process.env.REACT_APP_EMAIL_SERVICE,
      process.env.REACT_APP_EMAIL_RED,
      process.env.REACT_APP_API_EMAIL,
      {
        email_to: emailTo,
        subject_text: "Confirmación de Cancelación de Reserva de Hotel",
        other_email: otherEmail,

        titulo: "Confirmación de Cancelación de Reserva de Hotel",
        body_top:
          "Te confirmamos que tu solicitud de cancelación de la reserva de hotel ha sido procesada con éxito.",
        body_down:
          "Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros. esperamos poder servirte en futuras ocasiones.",
        footer: "¡Esperamos que tengas una viaje agradable!",

        hotelName: hotelName,
        startTravel: startTravel,
        finishTravel: finishTravel,
        numberRoom: numberRoom,
        roomType: roomType,
        totalPrice: totalPrice,
      }
    );
    const data = {
      service_id: process.env.REACT_APP_EMAIL_SERVICE,
      template_id: process.env.REACT_APP_EMAIL_RED,
      user_id: process.env.REACT_APP_API_EMAIL,
      template_params: {
        email_to: emailTo,
        subject_text: "Confirmación de Cancelación de Reserva de Hotel",
        other_email: otherEmail,

        titulo: "Confirmación de Cancelación de Reserva de Hotel",
        body_top:
          "Te confirmamos que tu solicitud de cancelación de la reserva de hotel ha sido procesada con éxito.",
        body_down:
          "Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros. esperamos poder servirte en futuras ocasiones.",
        footer: "¡Esperamos que tengas una viaje agradable!",

        hotelName: hotelName,
        startTravel: startTravel,
        finishTravel: finishTravel,
        numberRoom: numberRoom,
        roomType: roomType,
        totalPrice: totalPrice,
      },
    };

    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
        } else {
          console.error("Error al enviar el correo");
        }
      })
      .catch((error) => {
        console.error("Oops... " + error.message);
      });
  } catch (error) {}
};
