import { validate_goal_data } from './validations/validate_goal.js'
import { createGoal } from './api/api.js'

const name_goal = document.getElementById('name')
const target_amount = document.getElementById('target_amount')
const is_active = document.getElementById('is_achieved')
const submit = document.getElementById('btnSubmit')
let dead_line = document.getElementById('dead_line')

const token = localStorage.getItem("token")


submit.addEventListener('click', async (e) => {
    e.preventDefault()
    
    dead_line = is_active.checked ? false : dead_line.value
    console.log(dead_line)
    
    try {
        const data = {
            name: name_goal.value,
            target_amount: parseFloat(target_amount.value),
            dead_line: dead_line
        }
        validate_goal_data(data)
        await createGoal(token, data)
        window.location.href = "home.html"
    } catch (error) {
        console.error(error.message)
    }
})