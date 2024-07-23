
import { ResponsiveCalendar } from '@nivo/calendar'


export default function MyResponsiveCalendar({data}) {
    const customTooltip = ({ day, value }) => (
        <div
            style={{
                background: '#fff',
                padding: '5px 10px',
                border: '1px solid #ccc',
                color:"red"
            }}
        >
            <strong>{day}</strong>
            <br />
             {value} hours
        </div>
    );

  return(
    <ResponsiveCalendar
    theme={{text:{fill:"white"}}}
    data={data}
    from="2024-01-01"
    to="2024-12-31"
    emptyColor="gray"
    maxValue={8}
    colors={[ '#C7F9CC', '#94DDBC', '#6BBF8E', '#3A7D44' ]}
    margin={{  right: 40, left: 40 }}
    yearSpacing={40}
    monthSpacing={4}
    monthBorderColor="black"
    dayBorderWidth={2}
    dayBorderColor="black"
    tooltip={customTooltip}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left'
        }
    ]}
/>

  )
}
