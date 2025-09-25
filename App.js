import { SafeAreaView } from 'react-native'
import CommentApp from './CommentApp'
import Messenger from './Messenger'

export default function App() {
    return ( <
        SafeAreaView style = {
            { flex: 1 }
        } >
        <
        Messenger / >
        <
        CommentApp / >
        <
        /SafeAreaView>
    )
}