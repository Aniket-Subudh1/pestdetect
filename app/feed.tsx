// app/feed.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import BottomNavigation from '@/components/BottomNavigation';

interface FeedPost {
  id: number;
  userName: string;
  userAvatar: string;
  postImage: string;
  detectedIssue: string;
  suggestedPesticide: string;
  timestamp: string;
  location: string;
}

const mockFeedData: FeedPost[] = [
  {
    id: 1,
    userName: 'Rakesh Kumar',
    userAvatar: 'R',
    postImage: '🌾',
    detectedIssue: 'Rice Leaf Roller',
    suggestedPesticide: 'Chlorantraniliprole 150-300 ML/HA',
    timestamp: '2 hours ago',
    location: 'Bhubaneswar, Odisha',
  },
  {
    id: 2,
    userName: 'Priya Sharma',
    userAvatar: 'P',
    postImage: '🌱',
    detectedIssue: 'Small Brown Plant Hopper',
    suggestedPesticide: 'Buprofezin 250-300 G/HA',
    timestamp: '5 hours ago',
    location: 'Cuttack, Odisha',
  },
  {
    id: 3,
    userName: 'Amit Patel',
    userAvatar: 'A',
    postImage: '🌿',
    detectedIssue: 'Leaf Blight Disease',
    suggestedPesticide: 'Mancozeb 2-3 g/L',
    timestamp: '1 day ago',
    location: 'Puri, Odisha',
  },
];

export default function FeedScreen() {
  const renderFeedPost = (post: FeedPost) => (
    <TouchableOpacity key={post.id} style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>{post.userAvatar}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{post.userName}</Text>
            <Text style={styles.postLocation}>{post.location}</Text>
          </View>
        </View>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>

      <View style={styles.postImageContainer}>
        <View style={styles.postImage}>
          <Text style={styles.postImageEmoji}>{post.postImage}</Text>
        </View>
      </View>

      <View style={styles.postContent}>
        <View style={styles.detectionResult}>
          <Text style={styles.detectionLabel}>AI Detection:</Text>
          <Text style={styles.detectionValue}>{post.detectedIssue}</Text>
        </View>

        <View style={styles.pesticideRecommendation}>
          <Text style={styles.recommendationLabel}>Recommended Treatment:</Text>
          <View style={styles.pesticideCard}>
            <Text style={styles.pesticideText}>{post.suggestedPesticide}</Text>
          </View>
        </View>

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👍</Text>
            <Text style={styles.actionText}>Helpful</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Feed</Text>
        <Text style={styles.headerSubtitle}>Farmers helping farmers</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {mockFeedData.map(renderFeedPost)}
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#00BFA5',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  postLocation: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
  },
  postImageContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  postImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImageEmoji: {
    fontSize: 80,
  },
  postContent: {
    padding: 15,
    paddingTop: 0,
  },
  detectionResult: {
    marginBottom: 15,
  },
  detectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  detectionValue: {
    fontSize: 16,
    color: '#00BFA5',
    fontWeight: 'bold',
  },
  pesticideRecommendation: {
    marginBottom: 15,
  },
  recommendationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  pesticideCard: {
    backgroundColor: '#00BFA5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  pesticideText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
});