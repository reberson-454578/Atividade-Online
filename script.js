document
  .getElementById("quiz-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Coleta o nome do aluno
    const name = document.getElementById("name").value;

    // Respostas corretas
    const correctAnswers = {
      q1: "Paris",
      q2: "Marte",
      q3: "Amazônia",
      q4: "Leonardo da Vinci",
      q5: "Pacífico",
      q6: "8",
      q7: "Ouro",
      q8: "Baleia Azul",
      q9: "Crosta",
      q10: "Nitrogênio",
    };

    // Coleta as respostas das questões
    const userAnswers = {
      q1:
        document.querySelector('input[name="q1"]:checked')?.value ||
        "Não respondido",
      q2:
        document.querySelector('input[name="q2"]:checked')?.value ||
        "Não respondido",
      q3:
        document.querySelector('input[name="q3"]:checked')?.value ||
        "Não respondido",
      q4:
        document.querySelector('input[name="q4"]:checked')?.value ||
        "Não respondido",
      q5:
        document.querySelector('input[name="q5"]:checked')?.value ||
        "Não respondido",
      q6:
        document.querySelector('input[name="q6"]:checked')?.value ||
        "Não respondido",
      q7:
        document.querySelector('input[name="q7"]:checked')?.value ||
        "Não respondido",
      q8:
        document.querySelector('input[name="q8"]:checked')?.value ||
        "Não respondido",
      q9:
        document.querySelector('input[name="q9"]:checked')?.value ||
        "Não respondido",
      q10:
        document.querySelector('input[name="q10"]:checked')?.value ||
        "Não respondido",
    };

    // Parâmetros para o envio de e-mail com o EmailJS
    const templateParams = {
      from_name: name,
      q1: userAnswers.q1,
      q2: userAnswers.q2,
      q3: userAnswers.q3,
      q4: userAnswers.q4,
      q5: userAnswers.q5,
      q6: userAnswers.q6,
      q7: userAnswers.q7,
      q8: userAnswers.q8,
      q9: userAnswers.q9,
      q10: userAnswers.q10,
    };

    // Envio do e-mail usando EmailJS
    emailjs.send("service_gc0vu9c", "template_uo6yldi", templateParams).then(
      function (response) {
        // Exibe o modal de confirmação ao enviar com sucesso
        const modal = document.getElementById("modal");
        const closeBtn = document.querySelector(".close-btn");

        modal.style.display = "block";

        // Fecha o modal ao clicar no botão de fechar e então destaca as respostas corretas/incorretas
        closeBtn.onclick = function () {
          modal.style.display = "none";
          highlightAnswers();
        };

        // Fecha o modal ao clicar fora do conteúdo e então destaca as respostas corretas/incorretas
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
            highlightAnswers();
          }
        };

        // Reseta o formulário após o envio
        document.getElementById("quiz-form").reset();
      },
      function (error) {
        alert("Erro ao enviar atividade. Tente novamente.");
        console.error("Erro:", error);
      }
    );

    // Função para destacar respostas corretas e incorretas
    function highlightAnswers() {
      for (let question in correctAnswers) {
        const correctAnswer = correctAnswers[question];
        const userAnswer = userAnswers[question];

        // Destaca a resposta correta em verde
        const correctLabel = document.querySelector(
          `input[name="${question}"][value="${correctAnswer}"]`
        ).parentElement;
        correctLabel.style.backgroundColor = "#e0f8e8"; // Fundo verde claro
        correctLabel.style.color = "#27ae60"; // Texto verde escuro
        correctLabel.style.fontWeight = "bold"; // Negrito

        // Se a resposta do usuário for diferente da correta e foi marcada, destaque em vermelho
        if (userAnswer !== correctAnswer && userAnswer !== "Não respondido") {
          const incorrectLabel = document.querySelector(
            `input[name="${question}"][value="${userAnswer}"]`
          ).parentElement;
          incorrectLabel.style.backgroundColor = "#f8e0e0"; // Fundo vermelho claro
          incorrectLabel.style.color = "#e74c3c"; // Texto vermelho escuro
          incorrectLabel.style.fontWeight = "bold"; // Negrito
        }
      }
    }
  });
