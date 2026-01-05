import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import CounterList from './components/CounterList';
import EventList from './components/EventList';
import Login from './login';
import Signup from './signup';
import AddTaskModal from './components/AddTaskModal';
import EditTaskModal from './components/EditTaskModal';
import AddCounterModal from './components/AddCounterModal';
import AddEventModal from './components/AddEventModal';
import api from './api';

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
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); // Sidebar open by default on larger screens

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  const handleAddEvent = async (event) => {
    try {
      await api.post('events/add', event);
      fetchData();
      setIsAddEventModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditTaskModalOpen(true);
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
            tasks={tasks}
            onAddTask={() => setIsAddTaskModalOpen(true)}
            onEditTask={openEditModal}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'counters':
        return <CounterList counters={counters} onAddCounter={() => setIsAddCounterModalOpen(true)} />;
      case 'events':
        return <EventList events={events} onAddEvent={() => setIsAddEventModalOpen(true)} />;
      default:
        return <TaskList tasks={tasks} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Header handleLogout={handleLogout} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar setView={setView} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
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
      {isAddEventModalOpen && (
        <AddEventModal
          onAddEvent={handleAddEvent}
          onClose={() => setIsAddEventModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
