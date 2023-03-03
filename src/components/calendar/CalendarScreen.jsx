import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Navbar } from "../ui/Navbar"
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { uiOpenModal } from '../../actions/uiActions';
import { clearActiveEvent, eventSetActive } from '../../actions/eventActions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es')
const localizer = momentLocalizer(moment)

export const CalendarScreen = ( ) => {

  const dispatch = useDispatch()

  // seleccionamos los eventos del calendario
  const { events, activeEvent } = useSelector( state => state.calendar )
  console.log(activeEvent);

  const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' )

  const onDoubleClick = ( e ) => {
    dispatch( uiOpenModal() )
  }

  const onSelectEvent = ( e ) => {
    dispatch( eventSetActive( e ) )
  }

  const onViewChange = ( e ) => {
    setLastView( e )
    localStorage.setItem( 'lastView', e )
  }

  const onSelectSlot = ( e ) =>{
    dispatch( clearActiveEvent() )
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#00bbcc',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }
    return {
      style
    }
  }

  return (
    <div>
      <Navbar />
      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent }
        onView={ onViewChange }
        onSelectSlot={ onSelectSlot }
        selectable={ true }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />
      
      <AddNewFab />
      {
        ( activeEvent ) ? <DeleteEventFab /> : null 
      }
      
      <CalendarModal />
    </div>
  )
}
