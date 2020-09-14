const generateRegistrationEmail = (firstName, lastname, token, email) => {
    return `<mjml>
    <mj-body>
      <mj-section>
        <mj-column border="black">
          <mj-divider border-color="#2A64B5"></mj-divider>
          <mj-text align="center" font-size="40px" color="#2A64B5" font-weight="bold">Apexa Ground Zero</mj-text>
          <mj-text font-size="24px" align="center">Email Verification for Registration</mj-text>
          <mj-text font-size="16px" font-weight="bold">Hello ${
              firstName + " " + lastName
          },</mj-text>
          <mj-text font-size="16px">Your <a href="http://groundzero.apexa.in" target="_blank">Apexa Ground Zero</a> account, <a href="mailto:${email}" target="_top">${email}</a>, has been created.</mj-text>
          <mj-text>Please click below verify button to complete the registration.</mj-text>
          <mj-button href="http://groundzero.apexa.in/v/${token}" background-color="#2A64B5">Verify</mj-button>
          <mj-text>If button don't work for some reason, please click below link.</mj-text>
          <mj-text font-size="12px"><a href="http://groundzero.apexa.in/v/${token} target="_blank">http://groundzero.apexa.in/v/${token}</a></mj-text>
          <mj-divider border-color="#2A64B5"></mj-divider>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`
}

export default {
    generateRegistrationEmail,
}
