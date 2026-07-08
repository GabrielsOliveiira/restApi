import { updateGoal, getExpecificGoal } from "./api.js";

async function GoalUpdateEventDealer(token, id){
    console.log(id)
    let goal = await getExpecificGoal(token, id)

    const data = {...goal, is_completed: !goal.is_completed}

    const resposta = await updateGoal(token, data, id)

    return resposta 
}

export { GoalUpdateEventDealer }