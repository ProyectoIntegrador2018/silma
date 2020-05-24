export const rejectTextEmail = (user, text) => {
  return {
    subject: "Tu libro ha sido rechazado",
    html: `
    <div>
      Buenas tardes ${user.name}.
      <br>
      Lamentamos informarle que su libro ${text.title} ha sido rechazado.
      <br>
      Le adjuntamos un PDF con la explicacion de porque su texto fue rechazado
    </div>
    `,
  };
};