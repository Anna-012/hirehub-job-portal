const passwordResetEmail = ({ name, resetUrl }) => {
  return `
    <h2>Reset Your HireHub Password</h2>

    <p>Hello ${name},</p>

    <p>
      You requested to reset your HireHub password.
    </p>

    <p>
      Click the button below to reset your password:
    </p>

    <a
      href="${resetUrl}"
      style="
        display:inline-block;
        padding:12px 20px;
        background:#2563eb;
        color:white;
        text-decoration:none;
        border-radius:6px;
      "
    >
      Reset Password
    </a>

    <p>
      This link will expire in 15 minutes.
    </p>

    <p>
      If you did not request this, you can safely ignore this email.
    </p>
  `;
};

export default passwordResetEmail;
