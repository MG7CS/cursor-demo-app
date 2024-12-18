import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface RegionPickerProps {
  value: string;
  onValueChange: (value: string) => void;
}

const REGIONS = [
  { label: 'Select Region', value: '' },
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  // Add more regions as needed
];

export function RegionPicker({ value, onValueChange }: RegionPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Region</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          {REGIONS.map((region) => (
            <Picker.Item
              key={region.value}
              label={region.label}
              value={region.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    width: '100%',
  },
}); 