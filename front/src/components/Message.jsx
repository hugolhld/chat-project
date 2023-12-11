import { useEffect } from "react"

export default function Message({ message, alignLeft, user, timestamp }) {

    // useEffect(() => {
    //   console.log(timestamp)
    //     console.log(date)
    //     const finalDate = date.getHours() + ':' + date.getMinutes() + ', ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        
    // }, [timestamp])

    useEffect(() => {
      console.log(message)
      console.log(alignLeft)
    //   console.log(user.first_name)
    }, [])

    const date = new Date(timestamp * 1000)
    


    const additionalClasses = {
        grid: alignLeft == true ? 'col-start-1 col-end-8' : 'col-start-6 col-end-13',
        flex: alignLeft == true ? 'flex-row' : 'justify-start flex-row-reverse',
        margin: alignLeft == true ? 'ml-3' : 'mr-3',
        background: alignLeft == true ? 'bg-indigo-500' : 'bg-indigo-200'
    } 
    
    return (
        <div className={`p-3 rounded-lg`}>
            <span className="text-xs w-full flex justify-center">{date.getHours() + ':' + date.getMinutes() + ', ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</span>
            <div className={`${additionalClasses.flex} flex items-center`}>
                <div className={`${additionalClasses.background} flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0`}>
                    {user.charAt(0)}
                </div>
                <div className={`${additionalClasses.margin} relative text-sm bg-white py-2 px-4 shadow rounded-xl`}>
                    <div>{ message }</div>
                </div>
            </div>
        </div>
    )
}