declare module "nodemailer" {
  const nodemailer: {
    createTransport: (options: unknown) => {
      sendMail: (mailOptions: unknown) => Promise<unknown>
    }
  }

  export default nodemailer
}