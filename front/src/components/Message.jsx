export default function Message({ message, alignLeft, user }) {

    const additionalClasses = {
        grid: alignLeft ? 'col-start-1 col-end-8' : 'col-start-6 col-end-13',
        flex: alignLeft ? 'flex-row' : 'justify-start flex-row-reverse',
        margin: alignLeft ? 'ml-3' : 'mr-3',
        background: alignLeft ? 'bg-indigo-500' : 'bg-indigo-200'
    } 
    
    return (
        <div className={`${additionalClasses.grid} p-3 rounded-lg`}>
            <div className={`${additionalClasses.flex} flex items-center`}>
                <div className={`${additionalClasses.background} flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0`}>
                    {user[0]}
                </div>
                <div className={`${additionalClasses.margin} relative text-sm bg-white py-2 px-4 shadow rounded-xl`}>
                    <div>{ message }</div>
                </div>
            </div>
        </div>
    )
}