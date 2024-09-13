import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import Card from "@/components/card/Card"

const QuestionDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`

function QuestionDetail() {
    const router = useRouter()
    const { id } = router.query
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState([])

    useEffect(() => {
      console.log('test')
        async function fetchData(){
          console.log('test fetch')
            const data = await fetch(`https://api.stackexchange.com/2.2/questions/${id}?site=stackoverflow`)
            const result = await data.json()
            console.log('result', result)
            setQuestion(result.items)
            setLoading(false)
            
            console.log('question', question)

        }
        id && fetchData()
        console.log('question', question)
    }, [id])
  return (
    <QuestionDetailContainer>
      <h2>Question: {id}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card
          key={question[0].question_id}
          title={question[0].title}
          views={question[0].view_count}
          answers={question[0].answer_count}
        />
      )}
    </QuestionDetailContainer>
  )
}

export default QuestionDetail