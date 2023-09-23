//import choices from "./choice"

export default function userchoices() {
    return(
    <ul>
        {choices.map(choice => {
            return(<li>{choice.name}</li>)
        })}
    </ul>
    )
}

