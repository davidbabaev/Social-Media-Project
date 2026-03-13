
export default function StatCardReuse({value, label}) {

        const style = {border:'1px solid lightgray' ,borderRadius: '10px', padding: '15px'}

  return (
    <div>
        <div style={style}>
            <h2>{value}</h2>
            <p>{label}</p>
        </div>
    </div>
  )
}
