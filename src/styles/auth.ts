import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.light.secondaryText,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 32,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: Colors.light.text,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: width * 0.6,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  description: {
    fontSize: 16,
    color: Colors.light.secondaryText,
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 24,
    marginBottom: 32,
  },
  link: {
    backgroundColor: 'transparent',
    color: Colors.light.accent,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E6DB5',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
    borderColor: '#B0B0B0',
  },
}); 