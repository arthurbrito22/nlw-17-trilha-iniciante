// sempre que usar uma uma função 'async', usar um 'await' antes da função


const{ select, input, checkbox } = require('@inquirer/prompts')


let meta = {
    value: 'Tomar 3L de agua por dia',
    checked: false,
}


let metas = [meta]


const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:" })
    
    if(meta.length == 0)    {
        console.log("A meta não pode ser vazia.")
        return
    }
    metas.push(
        {value: meta, checked: false }
    )
} 

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as Setas para mudar de meta, o Espaço para marcar/desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas], 
        instructions: false,

    })
    
    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }

  

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    
    if(realizadas.length == 0){
        console.log("Não existem metas realizadas. :(")
        return
    }
     
    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices:[...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true             //poderia colocar assim !meta.checked para dizer que o boolean é falso
    })

    if(abertas.length == 0) {
        console.log("Não existem metas abertas. :D")
        return
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const start = async () => {

    while(true){
        
        const opcao = await select({
            message: "Menu >", 
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },

                {
                    name: "Listar Metas",
                    value: "listar"
                },

                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },

                {
                    name: "Metas Abertas",
                    value: "abertas"
                },

                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        
        
        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break

            case "abertas":
                await metasAbertas()
                break

            case "sair":
                return
        }
    }                                        //ele vai passar por tudo isso e vai fazer 10x
}

start()