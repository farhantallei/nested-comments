import { PostDetailsScreen } from "@app/screens/PostDetailsSreen"
import { PostListScreen } from "@app/screens/PostListScreen"
import { NavigationContainer } from "@react-navigation/native"
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"

type RootStackParamList = {
  PostList: undefined
  PostDetails: { postId: string }
}

export type RootStackScreenProp<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

const Stack = createNativeStackNavigator<RootStackParamList>()

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PostList">
        <Stack.Screen name="PostList" component={PostListScreen} />
        <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
