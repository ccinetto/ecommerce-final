import nodemailer from 'nodemailer';
import { IOrden } from '../models/orden.model';
import Config from './config';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: Config.ethereal_username,
    pass: Config.ethereal_password,
  },
});

export const notificationMail = async (
  recipientEmail: string,
  orden: IOrden
) => {
  const salida = transporter.sendMail(
    {
      from: Config.ethereal_username,
      to: recipientEmail,
      subject: `El pedido ha sido ${orden.estado}`,
      text: JSON.stringify(orden),
    },
    async (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  );
  return salida;
};

// export default notificationMail;
