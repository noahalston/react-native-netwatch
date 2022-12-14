import React, { useState } from 'react';
import { Netwatch } from 'react-native-netwatch';
import { connect, Provider } from 'react-redux';
import store from './redux/store';
import { Dispatch } from 'redux';
import { Text, TouchableHighlight, StyleSheet, View, NativeModules } from 'react-native';
import { makeRequestInContinue } from './utils/requestGenerator';

const { ExampleModule } = NativeModules;

// FIXME: RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks (iOS)
const reduxConfigExample = {
  'action/withPayload': '👨 - Extra info',
  'action/withPayloadNamedDifferent': '👩 - Extra info',
  'action/withoutPayload': '🔑 - Extra info Logged',
};

if (__DEV__) {
  // @ts-ignore
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  const [netwatchVisible, setNetwatchVisible] = useState(false);
  const [netwatchEnabled, setNetwatchEnabled] = useState(true);

  return (
    <Provider store={store}>
      <ConnectedComponent
        enabled={netwatchEnabled}
        visible={netwatchVisible}
        interceptIOS={true}
        onPressClose={() => setNetwatchVisible(false)}
        disableShake
        reduxConfig={reduxConfigExample}
        showStats={true}
        useReactotron={false}
      />
      <View style={styles.container}>
        <Text style={styles.title}>react-native-netwatch</Text>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => setNetwatchVisible(true)}
          testID="buttonDisplayNetwatch"
        >
          <Text style={styles.textStyle}>Display Netwatch</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.enableButton}
          onPress={() => {
            setNetwatchEnabled(!netwatchEnabled);
          }}
          testID="buttonDisabledNetwatch"
        >
          <Text style={styles.textStyle}>{netwatchEnabled ? 'Disabled Netwatch' : 'Enabled Netwatch'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.enableButton}
          onPress={() => {
            ExampleModule.fetchSomething('https://reqres.in/api/users?page=2');
          }}
          testID="buttonSendNativeRequest"
        >
          <Text style={styles.textStyle}>Send a Native request</Text>
        </TouchableHighlight>
        <ConnectedButtonA />
        <ConnectedButtonB />
        <ConnectedButtonC />
      </View>
    </Provider>
  );
};

const ButtonA = (props: any) => (
  <TouchableHighlight
    style={styles.enableButton}
    onPress={() => {
      props.customAction({ type: 'action/withPayload', payload: 'Learn about actions' });
    }}
    testID="buttonDispatchActionA"
  >
    <Text style={styles.textStyle}>Dispatch Action (type/payload)</Text>
  </TouchableHighlight>
);

const ButtonB = (props: any) => (
  <TouchableHighlight
    style={styles.enableButton}
    onPress={() => {
      props.customAction({
        type: 'action/withPayloadNamedDifferent',
        credentials: {
          first: 'Payload name is different',
          second: 'try to do a test for a big',
          third: 'payload and see if it crash or not',
        },
      });
    }}
    testID="buttonDispatchActionB"
  >
    <Text style={styles.textStyle}>Dispatch Action (type/credentials)</Text>
  </TouchableHighlight>
);

const ButtonC = (props: any) => (
  <TouchableHighlight
    style={styles.enableButton}
    onPress={() => {
      props.customAction({ type: 'action/withoutPayload' });
    }}
    testID="buttonDispatchActionC"
  >
    <Text style={styles.textStyle}>Dispatch Action (type/NO PAYLOAD)</Text>
  </TouchableHighlight>
);

export function mapDispatchToProps(dispatch: Dispatch, props: any): any {
  return {
    ...props,
    customAction: (action: any) => dispatch(action),
  };
}

const ConnectedButtonA = connect(null, mapDispatchToProps)(ButtonA);
const ConnectedButtonB = connect(null, mapDispatchToProps)(ButtonB);
const ConnectedButtonC = connect(null, mapDispatchToProps)(ButtonC);
const ConnectedComponent = connect(null, mapDispatchToProps)(Netwatch);

export default App;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 60,
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  openButton: {
    backgroundColor: '#67E8F9',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    marginBottom: 16,
  },
  enableButton: {
    backgroundColor: '#06B6D4',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    marginBottom: 16,
  },
  textStyle: {
    color: '#111827',
    textAlign: 'center',
  },
});

if (__DEV__) {
  let isStarted: boolean = false;
  !isStarted &&
    setTimeout(() => {
      makeRequestInContinue();
    }, 500);
  isStarted = true;
}
