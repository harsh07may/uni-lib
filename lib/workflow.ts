import { Client as QStashClient, resend } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";

import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashclient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashclient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Portfolio Contact <bookwise@email.harsh07may.site>",
      to: [email],
      subject,
      html: emailBody(email.split("@")[0]),
    },
  });
};

const emailBody = (userName: string) =>
  `<!DOCTYPE html>
  <html>
  <head>
  <title>Welcome Email</title>
  </head>
  <body>
  <h1>Welcome to Bookwise, ${userName}!</h1>
  <p>We're excited to have you onboard at Bookwise. We hope you enjoy your journey with us. If you have any questions or need assistance, feel free to reach out.</p>
  <a href="https://uni-lib-flax.vercel.app/">Get Started</a>
  <p>Cheers,<br>The Bookwise Team</p>
  </body>
  </html>`;
