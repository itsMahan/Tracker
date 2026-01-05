import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNavbar from './components/BottomNavbar';
import TaskList from './components/TaskList';
import CounterList from './components/CounterList';
import EventList from './components/EventList';
import History from './components/History';
import Login from './login';
import Signup from './signup';
import AddTaskModal from './components/AddTaskModal';
import EditTaskModal from './components/EditTaskModal';
import AddCounterModal from './components/AddCounterModal';
import EditCounterModal from './components/EditCounterModal';
import AddEventModal from './components/AddEventModal';
import EditEventModal from './components/EditEventModal';
import api from './api';
import { format } from 'date-fns';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));
  const [showSignup, setShowSignup] = useState(false);
  const [view, setView] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [counters, setCounters] = useState([]);
  const [events, setEvents] = useState([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isAddCounterModalOpen, setIsAddCounterModalOpen] = useState(false);
  const [isEditCounterModalOpen, setIsEditCounterModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingCounter, setEditingCounter] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);


  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const fetchData = async () => {
    try {
      const [tasksRes, countersRes, eventsRes] = await Promise.all([
        api.get('tasks/list'),
        api.get('counters/list'),
        api.get('events/list')
      ]);
      setTasks(tasksRes.data);
      setCounters(countersRes.data);
      setEvents(eventsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (task) => {
    try {
      await api.post('tasks/add', task);
      fetchData();
      setIsAddTaskModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      await api.put(`tasks/update/${task.id}`, task);
      fetchData();
      setIsEditTaskModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTaskDone = async (taskId, isDone) => {
    try {
      await api.patch(`tasks/mark/${taskId}`, { is_done: isDone });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestoreTask = async (taskId) => {
    try {
      await api.patch(`tasks/mark/${taskId}`, { is_done: false });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`tasks/delete/${taskId}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCounter = async (counter) => {
    try {
      await api.post('counters/add', counter);
      fetchData();
      setIsAddCounterModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCounter = async (counter) => {
    try {
      await api.put(`counters/update/${counter.id}`, counter);
      fetchData();
      setIsEditCounterModalOpen(false);
      setEditingCounter(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetCounter = async (counterId) => {
    try {
      await api.patch(`counters/reset/${counterId}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCounter = async (counterId) => {
    try {
      await api.delete(`counters/delete/${counterId}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEvent = async (event) => {
    try {
      await api.post('events/add', event);
      fetchData();
      setIsAddEventModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateEvent = async (event) => {
    try {
      await api.put(`events/update/${event.id}`, event);
      fetchData();
      setIsEditEventModalOpen(false);
      setEditingEvent(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await api.delete(`events/delete/${eventId}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecreaseEvent = async (eventId) => {
    try {
      await api.patch(`events/decrease/${eventId}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleIncreaseEvent = async (eventId) => {
    try {
      await api.patch(`events/increase/${eventId}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetEvent = async (eventId) => {
    try {
      await api.patch(`events/reset/${eventId}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditTaskModalOpen(true);
  };

  const openEditCounterModal = (counter) => {
    setEditingCounter(counter);
    setIsEditCounterModalOpen(true);
  };

  const openEditEventModal = (event) => {
    setEditingEvent(event);
    setIsEditEventModalOpen(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} onShowLogin={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={() => setIsLoggedIn(true)} onShowSignup={() => setShowSignup(true)} />
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'tasks':
        return (
          <TaskList
            tasks={tasks.filter(task => !task.is_done)}
            onAddTask={() => setIsAddTaskModalOpen(true)}
            onEditTask={openEditModal}
            onDeleteTask={handleDeleteTask}
            onToggleDone={handleToggleTaskDone}
            isLargeScreen={isLargeScreen}
          />
        );
      case 'counters':
        return <CounterList
          counters={counters}
          onAddCounter={() => setIsAddCounterModalOpen(true)}
          onReset={handleResetCounter}
          onEdit={openEditCounterModal}
          onDelete={handleDeleteCounter}
          isLargeScreen={isLargeScreen}
        />;
      case 'events':
        return <EventList
          events={events}
          onAddEvent={() => setIsAddEventModalOpen(true)}
          onEdit={openEditEventModal}
          onDelete={handleDeleteEvent}
          onDecrease={handleDecreaseEvent}
          onIncrease={handleIncreaseEvent}
          onReset={handleResetEvent}
          isLargeScreen={isLargeScreen}
        />;
      case 'history':
        return <History completedTasks={tasks.filter(task => task.is_done)} onRestoreTask={handleRestoreTask} />;
      default:
        return <TaskList tasks={tasks.filter(task => !task.is_done)} isLargeScreen={isLargeScreen} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Header handleLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        {isLargeScreen && <Sidebar setView={setView} />}
        <main className="flex-1 overflow-y-auto pb-16">
          {renderContent()}
        </main>
      </div>
      {!isLargeScreen && <BottomNavbar setView={setView} currentView={view} />}

      {view === 'tasks' && !isLargeScreen && (
        <button
          className="btn btn-primary btn-circle fixed bottom-20 left-4"
          onClick={() => setIsAddTaskModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
      
      {view === 'counters' && !isLargeScreen && (
        <button
          className="btn btn-primary btn-circle fixed bottom-20 left-4"
          onClick={() => setIsAddCounterModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}

      {view === 'events' && !isLargeScreen && (
        <button
          className="btn btn-primary btn-circle fixed bottom-20 left-4"
          onClick={() => setIsAddEventModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}

      {isAddTaskModalOpen && (
        <AddTaskModal
          onAddTask={handleAddTask}
          onClose={() => setIsAddTaskModalOpen(false)}
        />
      )}
      {isEditTaskModalOpen && (
        <EditTaskModal
          task={editingTask}
          onUpdateTask={handleUpdateTask}
          onClose={() => setIsEditTaskModalOpen(false)}
        />
      )}
      {isAddCounterModalOpen && (
        <AddCounterModal
          onAddCounter={handleAddCounter}
          onClose={() => setIsAddCounterModalOpen(false)}
        />
      )}
      {isEditCounterModalOpen && editingCounter && (
        <EditCounterModal
          counter={editingCounter}
          onUpdateCounter={handleUpdateCounter}
          onClose={() => setIsEditCounterModalOpen(false)}
        />
      )}
      {isAddEventModalOpen && (
        <AddEventModal
          onAddEvent={handleAddEvent}
          onClose={() => setIsAddEventModalOpen(false)}
        />
      )}
      {isEditEventModalOpen && editingEvent && (
        <EditEventModal
          event={editingEvent}
          onUpdateEvent={handleUpdateEvent}
          onClose={() => setIsEditEventModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;