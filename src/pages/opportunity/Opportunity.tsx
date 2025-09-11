import { OpportunityModal } from "@/components/opportunity/Opportunity";

export function Opportunity() {
  return (
    <div>
      <div>Opportunity Page</div>
      <div className="flex justify-end">
        <OpportunityModal
          title="Peneira Santos Sub-10"
          address="Estádio Vila Belmiro, Rua Princesa Isabel, Vila Belmiro, Santos - SP, 11075-501"
          fullDescription="Esta oportunidade foi criada para atletas que buscam dar um passo adiante em sua carreira esportiva, seja no início de sua jornada ou já em fase de desenvolvimento. O objetivo é oferecer condições que favoreçam não apenas o desempenho esportivo, mas também o crescimento pessoal e profissional do atleta, com foco em resultados, disciplina e visibilidade no cenário esportivo.
                                    O programa proporciona acesso a uma rede de contatos formada por profissionais qualificados, treinadores, preparadores físicos e gestores esportivos, além de criar um ambiente favorável para troca de experiências entre atletas de diferentes modalidades. Através de treinamentos direcionados, acompanhamento técnico e apoio estratégico, os participantes terão a oportunidade de aprimorar suas habilidades, fortalecer aspectos físicos e psicológicos, e desenvolver competências que vão além do esporte, como liderança, trabalho em equipe e resiliência.
                                    Outro diferencial desta oportunidade é a visibilidade oferecida. Atletas terão espaço para mostrar seu talento em competições, eventos esportivos e projetos sociais vinculados, ampliando seu alcance e aumentando suas chances de conquistar patrocínios e convites para novas participações em campeonatos regionais, nacionais ou até internacionais. Além disso, há a possibilidade de construir uma marca pessoal sólida, explorando a imagem do atleta como inspiração para novas gerações e como agente transformador dentro e fora do esporte.
                                    Mais do que apenas competir, esta oportunidade representa uma porta de entrada para quem deseja alcançar novos patamares no esporte, explorando o potencial máximo do seu talento. É uma chance de se conectar com pessoas que acreditam no esporte como ferramenta de transformação e de se preparar para encarar desafios cada vez maiores com confiança e dedicação."
          userPhoto=""
          userName="Santos FC"
          date="06/02/2025"
        />
      </div>
    </div>
  );
}
