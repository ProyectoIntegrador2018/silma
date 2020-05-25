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

export const movePhaseEmail = [
    {
        "email": "",
        "subject": "",
        "text": "",
        "html":
        `
            <div>
                <div>¡Hola!</div>
                <div>
                Te informamors que varios lectores aprobaron tu texto y avanzara a fase 2.
                </div>
                <div>
                Muchas felicidades, Equipo Silma
                </div>
                </span>
            </div>
        `,
    },
    {
        "email": "",
        "subject": "",
        "text": "",
        "html":
        `
            <div>
                <div>¡Hola!</div>
                <div>
                Te informamors que varios lectores aprobaron tu texto y avanzara a fase 3.
                </div>
                <div>
                Muchas felicidades, Equipo Silma
                </div>
                </span>
            </div>
        `,
    },
    {
        "email": "",
        "subject": "Tu texto ha sido avanzado de fase!",
        "text": "",
        "html":
        `
            <div>
                <div>¡Hola!</div>
                <div>
                Te informamors que varios lectores aprobaron tu texto y avanzara a fase 4.
                </div>
                <div>
                Muchas felicidades, Equipo Silma
                </div>
                </span>
            </div>
        `,
    },
]