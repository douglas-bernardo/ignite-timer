import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

const formValidationSchema = zod.object({
  task: zod.string().min(1, 'Task must have at least one char'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormDataMadeByZod = zod.infer<typeof formValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } =
    useForm<NewCycleFormDataMadeByZod>({
      resolver: zodResolver(formValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  function handleCreateNewCycle(data: NewCycleFormDataMadeByZod) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const hasInputTaskSomeValue = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task" className="task">
            Vou trabalhar em
          </label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 1"></option>
            <option value="Project 2"></option>
            <option value="Project 3"></option>
            <option value="Project 4"></option>
          </datalist>

          <label htmlFor="minutesAmount" className="for">
            durante
          </label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            // min={0}
            // max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator> :</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={hasInputTaskSomeValue} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
