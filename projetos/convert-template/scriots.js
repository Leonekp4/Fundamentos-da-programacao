// Cotação de moedas do dia.
const USD = 5.66
const EUR = 6.23
const GBP  = 7.41

// Obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency  = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")



// Manipulando o input amout para receber somente números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

//captando o evento de submit (eviar) do formulário.
form.onsubmit = (event)  => {
    event.preventDefault()

    // console.log(currency.value)

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value,  USD, "US$")
            break
        case  "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case  "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

// Função  para converter a moeda.
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total.
        let total = amount * price

        // verifica se o resultado não é um número.
        if (isNaN(total)) {
            return alert("Por favor, digite o valor correto para converter.")
        }

        // Formatar o valor total.
        total = formatCurrencyBRL(total).replace("R$", "")

        //Exibindo o resultado total.
        //result.textContent = `${formatCurrencyBRL(total)} Reais`
         result.textContent = `${(total)} Reais`

        // Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")
    }catch (error) {

        // Remove  a classe que exibe o footer para esconder o resultado.
        footer.classList.remove("show-result")
        
        console.log(error)
        alert("Não foi possível converter. Tente novamente mais terde.")
    }

}
// Formata a moeda em real Brasileiro.
function formatCurrencyBRL(value) {
    //Converte para número para utilizar o toLocaleString para formatar no padrão BRL(R$ 00,00).
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}