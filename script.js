const handle_submit_econo_calculator = e => {
    e.preventDefault()
    const { 
        car_price:{value:car_price}, 
        current_car_mpg:{value:current_car_mpg}, 
        new_car_mpg:{value:new_car_mpg}, 
        monthly_mileage:{value:monthly_mileage}, 
        fuel_price:{value:fuel_price},
        new_car_monthly_insurance:{value:new_car_monthly_insurance},
    } = e.target
    let months_til_break_even = calculate_time_to_payoff_fuel_economy_vehicle(car_price, monthly_mileage, current_car_mpg, new_car_mpg, fuel_price, new_car_monthly_insurance)
    months_to_payoff_fuel_economy_vehicle.innerText = months_til_break_even
}

function calculate_time_to_payoff_fuel_economy_vehicle(car_price, monthly_mileage, current_car_mpg, new_car_mpg, fuel_price, new_car_monthly_insurance) {
    let months_til_break_even = 0
    let total_savings = 0
    let monthly_fuel_savings = (monthly_mileage / current_car_mpg * fuel_price) - (monthly_mileage / new_car_mpg * fuel_price)

    // Calculate total monthly expense if break-even is impossible
    let total_monthly_expense = (car_price / 60) + new_car_monthly_insurance - monthly_fuel_savings;

    if (monthly_fuel_savings <= new_car_monthly_insurance) {
        return `The new car will never pay for itself. Your added monthly expense over the next five years would be: $${Math.abs(total_monthly_expense.toFixed(2))}`;
    }

    while (total_savings < car_price + (months_til_break_even * new_car_monthly_insurance)) {
        months_til_break_even++
        total_savings += monthly_fuel_savings;
        console.log(months_til_break_even)
        if( months_til_break_even > 1200 ){
            return "It would take over 100 years to break even."
        }
    }

    return `The new car will pay for itself in approximately ${months_til_break_even} months.`
}


