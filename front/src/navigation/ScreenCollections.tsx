// ++ New Screen 
import SplashScreen from "../screens/auth/SplashSceen";
import LoginScreen from "../screens/auth/LoginScreen";
import BottomTab from "./BottomTab";
import RegisteryScreen from "../screens/auth/RegisteryScreen";
import PatientHome from "../screens/MainScreen/PatientHome";
import SecondScreen from "../screens/MainScreen/SecondScreen";
import ThirdScreen from "../screens/MainScreen/ThirdScreen";

// ++ Screen Type ??

// ++ New Screen Stack
export const authStack = [
    {
        name: 'SplashScreen',
        component: SplashScreen,
    },
    {
        name: 'LoginScreen',
        component: LoginScreen,
    },
    {
        name: "RegisteryScreen",
        component: RegisteryScreen,
    }

];

export const dashboardStack = [
    {
        name:"BottomTab",
        component: BottomTab
    },
    {
        name:"PatientHome",
        component: PatientHome,
    },
    {
        name:"SecondScreen",
        component: SecondScreen
    },
    {
        name:"ThirdScreen",
        component: ThirdScreen,
    },
    
    
];

export const mergedStacks = [...dashboardStack, ...authStack];