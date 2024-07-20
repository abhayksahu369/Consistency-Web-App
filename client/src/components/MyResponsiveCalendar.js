
import { ResponsiveCalendar } from '@nivo/calendar'


export default function MyResponsiveCalendar({data}) {
    const customTooltip = ({ day, value }) => (
        <div
            style={{
                background: '#fff',
                padding: '5px 10px',
                border: '1px solid #ccc',
            }}
        >
            <strong>{day}</strong>
            <br />
             {value} hours
        </div>
    );

  return(
    <ResponsiveCalendar
    data={data}
    from="2024-01-01"
    to="2024-12-31"
    emptyColor="#eeeeee"
    maxValue={8}
    colors={[ '#C7F9CC', '#94DDBC', '#6BBF8E', '#3A7D44' ]}
    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    yearSpacing={40}
    monthSpacing={4}
    monthBorderColor="#ffffff"
    dayBorderWidth={2}
    dayBorderColor="#ffffff"
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
