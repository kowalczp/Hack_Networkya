import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Application } from 'react-rainbow-components';
import { AuthProvider } from './contexts/Auth';
import PrivateRoute from './routing/PrivateRoute';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { SetupPage } from './pages/SetupPage';
import { StartPage } from './pages/StartPage';
import { Routes } from './routing/router';
import { Profile } from './pages/Profile';
import { AddedGoalsWithoutSubTarget } from './pages/AddedGoalsWithoutSubTarget';
import { EditGoal } from './pages/EditGoal';
import { Goals } from './pages/PersonalGoals';
import { AddTask } from './pages/AddTask';
import { Chat } from './pages/Chat';
import { AddSubtask } from './pages/AddSubTask';
import { Layout } from './components/Layout';
import { TaskTimeline } from './pages/TaskTimeline';
import { SaveTaskAndSubTasks } from './pages/SaveTaskAndSubTasks';
import { GoalContextProvider } from './contexts/CurrentGoal';
import { AddSubTaskForm } from './pages/AddSubTaskForm';
import { AddPost } from './pages/AddPost';
import { AddResult } from './pages/AddResult';
import { ChatWindow } from './pages/ChatWindow';
import { OnboardingProvider } from './contexts/OnboardingContext';

const theme: DefaultTheme = {
    rainbow: {
        palette: {
            primary: {
                main: '#01B6F5',
                light: '#B0EFFE',
                dark: '#061C3F'
            },
            secondary: {
                main: '#FF507A',
                light: '#FC5B82',
                dark: '#E5E5E5'
            },
            text: {
                primary: '#000000',
                secondary: '#061C3F',
                gray: '#595454',
                lightGray: '#8898AA'
            },
            background: {
                grey: '#E5E5E5',
                white: '#FFFFFF'
            },
            success: '#1AD1A3',
            error: '#f14336',
            warning: '#f7b500',
            brand: '#00CAFD'
        }
    }
};

const rainbowTheme = {
    rainbow: {
        palette: {
            success: '#FF507A'
        }
    }
};

const App = () => (
    <ThemeProvider theme={theme}>
        <Application theme={rainbowTheme}>
            <OnboardingProvider>
                <GoalContextProvider>
                    <AuthProvider>
                        <Router>
                            <Switch>
                                <Route exact path={Routes.Login} component={Login} />
                                <Route exact path={Routes.Registration} component={Registration} />
                                <PrivateRoute path={Routes.Setup} component={SetupPage} />
                                <PrivateRoute exact path={Routes.ChatWindow} component={ChatWindow} />
                                <Layout>
                                    <PrivateRoute exact path={Routes.Home} component={StartPage} />
                                    <PrivateRoute exact path={Routes.Profile} component={Profile} />
                                    <PrivateRoute exact path={Routes.AddTask} component={AddTask} />
                                    <PrivateRoute exact path={Routes.AddSubtask} component={AddSubtask} />
                                    <PrivateRoute exact path={Routes.TimelineGoals} component={TaskTimeline} />
                                    <PrivateRoute
                                        exact
                                        path={Routes.SaveTaskAndSubtask}
                                        component={SaveTaskAndSubTasks}
                                    />
                                    <PrivateRoute exact path={Routes.NewPost} component={AddPost} />
                                    <PrivateRoute exact path={Routes.AddSubTaskForm} component={AddSubTaskForm} />
                                    <PrivateRoute exact path={Routes.AddSubtask} component={AddSubtask} />
                                    <PrivateRoute exact path={Routes.Goals} component={Goals} />
                                    <PrivateRoute exact path={Routes.AddGoalReasults} component={AddResult} />
                                    <PrivateRoute
                                        exact
                                        path={Routes.AddedGoalsWithoutSubTarget}
                                        component={AddedGoalsWithoutSubTarget}
                                    />
                                    <PrivateRoute exact path={Routes.EditGoal} component={EditGoal} />
                                    <PrivateRoute exact path={Routes.Chat} component={Chat} />
                                </Layout>
                                <Route path={'/'} component={() => <Redirect to={Routes.Login} />} />
                            </Switch>
                        </Router>
                    </AuthProvider>
                </GoalContextProvider>
            </OnboardingProvider>
        </Application>
    </ThemeProvider>
);

export default App;
