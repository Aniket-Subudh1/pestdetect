import { router, usePathname } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface NavItem {
  key: string;
  image: ImageSourcePropType;
  label: string;
  route: string;
}

const navItems: NavItem[] = [
  {
    key: 'home',
    image: require('../assets/images/home.png'), 
    label: 'Home',
    route: '/(tabs)'
  },
  {
    key: 'menu',
    image: require('../assets/images/menu.png'), 
    label: 'Menu',
    route: '/feed'
  },
  {
    key: 'profile',
    image: require('../assets/images/user.png'),
    label: 'You',
    route: '/profile'
  }
];

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/(tabs)') {
      return pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index';
    }
    return pathname === route;
  };

  const handleNavPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {navItems.map((item) => {
          const active = isActive(item.route);
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.navItem}
              onPress={() => handleNavPress(item.route)}
              activeOpacity={0.7}
            >
              <Image
                source={item.image}
                style={[styles.iconImage, active && styles.activeImage]}
              />
              <Text style={[styles.navLabel, active && styles.activeLabel]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    zIndex: 999,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconImage: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#aaa',
  },
  activeImage: {
    tintColor: '#00BFA5',
    transform: [{ scale: 1.2 }],
  },
  navLabel: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
