import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { supabase } from "lib/supabase";
import { AuthStore } from "lib/store/authStore";
import { useMutation } from "@tanstack/react-query";

type Gender = "MALE" | "FEMALE";
type Lifestyle = "SEDENTARY" | "MINIMAL" | "OFFICE_WORK" | "ACTIVE" | "VERY_ACTIVE";
type ExerciseLevel = "BEGINNER" | "INTERMEDIATE_1_3" | "INTERMEDIATE_3_5" | "ADVANCED" | "EXPERT";
type ExerciseFrequency =
  | "NONE"
  | "ONCE_WEEKLY"
  | "TWICE_WEEKLY"
  | "THRICE_WEEKLY"
  | "FOUR_WEEKLY"
  | "FIVE_WEEKLY"
  | "SIX_WEEKLY"
  | "DAILY";
type HealthLevel =
  | "VERY_GOOD"
  | "GOOD"
  | "ABOVE_AVERAGE"
  | "AVERAGE"
  | "BELOW_AVERAGE"
  | "POOR"
  | "VERY_POOR";

export default function SignupScreen() {
  const { session } = AuthStore();
  const [formData, setFormData] = useState({
    gender: "MALE" as Gender,
    age: "",
    height: "",
    weight: "",
    lifestyle: "OFFICE_WORK" as Lifestyle,
    exerciseLevel: "BEGINNER" as ExerciseLevel,
    exerciseFrequency: "TWICE_WEEKLY" as ExerciseFrequency,
    healthLevel: "AVERAGE" as HealthLevel,
  });

  const createProfileMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id || !session?.user?.email) {
        throw new Error("필수 정보가 없습니다");
      }

      const { error: userError } = await supabase.from("users").insert({
        id: session.user.id,
        email: session.user.email,
      });

      if (userError) throw userError;

      const { error: profileError } = await supabase.from("macro_profiles").insert({
        id: session.user.id,
        gender: formData.gender,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        lifestyle: formData.lifestyle,
        exerciseLevel: formData.exerciseLevel,
        exerciseFrequency: formData.exerciseFrequency,
        healthLevel: formData.healthLevel,
      });

      if (profileError) throw profileError;

      return true;
    },
    onSuccess: () => {
      Alert.alert("성공", "프로필이 생성되었습니다!");
    },
    onError: (error: Error) => {
      Alert.alert("오류", error.message || "프로필 생성 중 오류가 발생했습니다");
    },
  });

  const isFormValid =
    formData.age &&
    formData.height &&
    formData.weight &&
    parseInt(formData.age) > 0 &&
    parseFloat(formData.height) > 0 &&
    parseFloat(formData.weight) > 0;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">프로필 설정</Text>
        <Text className="text-sm text-gray-600 mb-8">
          탄단지 계산을 위해 기본 정보를 입력해주세요
        </Text>

        {/* 이메일 표시 */}
        <View className="mb-6 p-4 bg-gray-50 rounded-lg">
          <Text className="text-sm text-gray-600 mb-1">이메일</Text>
          <Text className="text-base font-semibold text-gray-900">{session?.user?.email}</Text>
        </View>

        {/* 성별 */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">성별</Text>
          <View className="flex-row gap-4">
            {(["MALE", "FEMALE"] as Gender[]).map((gender) => (
              <TouchableOpacity
                key={gender}
                onPress={() => setFormData({ ...formData, gender })}
                className={`flex-1 py-3 rounded-lg items-center border-2 ${
                  formData.gender === gender
                    ? "bg-blue-100 border-blue-600"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <Text
                  className={`font-semibold ${formData.gender === gender ? "text-blue-600" : "text-gray-700"}`}
                >
                  {gender === "MALE" ? "남자" : "여자"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 나이 */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2">나이 (만)</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="예: 25"
            keyboardType="number-pad"
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
          />
        </View>

        {/* 키 */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2">키 (cm)</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="예: 175.5"
            keyboardType="decimal-pad"
            value={formData.height}
            onChangeText={(text) => setFormData({ ...formData, height: text })}
          />
        </View>

        {/* 체중 */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2">체중 (kg)</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="예: 75.5"
            keyboardType="decimal-pad"
            value={formData.weight}
            onChangeText={(text) => setFormData({ ...formData, weight: text })}
          />
        </View>

        {/* 생활 습관 */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">생활 습관</Text>
          {(["SEDENTARY", "MINIMAL", "OFFICE_WORK", "ACTIVE", "VERY_ACTIVE"] as Lifestyle[]).map(
            (lifestyle) => (
              <TouchableOpacity
                key={lifestyle}
                onPress={() => setFormData({ ...formData, lifestyle })}
                className={`py-3 px-4 rounded-lg mb-2 border-2 ${
                  formData.lifestyle === lifestyle
                    ? "bg-blue-100 border-blue-600"
                    : "bg-gray-50 border-gray-300"
                }`}
              >
                <Text
                  className={`font-medium ${formData.lifestyle === lifestyle ? "text-blue-600" : "text-gray-700"}`}
                >
                  {getLifestyleLabel(lifestyle)}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* 운동 경력 */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">운동 경력</Text>
          {(
            [
              "BEGINNER",
              "INTERMEDIATE_1_3",
              "INTERMEDIATE_3_5",
              "ADVANCED",
              "EXPERT",
            ] as ExerciseLevel[]
          ).map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setFormData({ ...formData, exerciseLevel: level })}
              className={`py-3 px-4 rounded-lg mb-2 border-2 ${
                formData.exerciseLevel === level
                  ? "bg-blue-100 border-blue-600"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <Text
                className={`font-medium ${formData.exerciseLevel === level ? "text-blue-600" : "text-gray-700"}`}
              >
                {getExerciseLevelLabel(level)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 운동 횟수 */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">주 운동 횟수</Text>
          {(
            [
              "NONE",
              "ONCE_WEEKLY",
              "TWICE_WEEKLY",
              "THRICE_WEEKLY",
              "FOUR_WEEKLY",
              "FIVE_WEEKLY",
              "SIX_WEEKLY",
              "DAILY",
            ] as ExerciseFrequency[]
          ).map((freq) => (
            <TouchableOpacity
              key={freq}
              onPress={() => setFormData({ ...formData, exerciseFrequency: freq })}
              className={`py-3 px-4 rounded-lg mb-2 border-2 ${
                formData.exerciseFrequency === freq
                  ? "bg-blue-100 border-blue-600"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <Text
                className={`font-medium ${formData.exerciseFrequency === freq ? "text-blue-600" : "text-gray-700"}`}
              >
                {getExerciseFrequencyLabel(freq)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 체력 수준 */}
        <View className="mb-8">
          <Text className="text-sm font-semibold text-gray-700 mb-3">체력 수준</Text>
          {(
            [
              "VERY_GOOD",
              "GOOD",
              "ABOVE_AVERAGE",
              "AVERAGE",
              "BELOW_AVERAGE",
              "POOR",
              "VERY_POOR",
            ] as HealthLevel[]
          ).map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setFormData({ ...formData, healthLevel: level })}
              className={`py-3 px-4 rounded-lg mb-2 border-2 ${
                formData.healthLevel === level
                  ? "bg-blue-100 border-blue-600"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <Text
                className={`font-medium ${formData.healthLevel === level ? "text-blue-600" : "text-gray-700"}`}
              >
                {getHealthLevelLabel(level)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 제출 버튼 */}
        <TouchableOpacity
          onPress={() => createProfileMutation.mutate()}
          disabled={!isFormValid || createProfileMutation.isPending}
          className={`py-4 rounded-xl items-center mb-6 ${
            isFormValid && !createProfileMutation.isPending ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          {createProfileMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">프로필 완성하기</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// 라벨 함수들
function getLifestyleLabel(lifestyle: Lifestyle): string {
  const labels: Record<Lifestyle, string> = {
    SEDENTARY: "매우 활동적이지 않음 (15시간 이상 누워있음)",
    MINIMAL: "활동적이지 않음 (집에서 거의 움직이지 않음)",
    OFFICE_WORK: "일반적인 활동 (학생 또는 사무직)",
    ACTIVE: "활동적임",
    VERY_ACTIVE: "매우 활동적 (보통 뛰어다님)",
  };
  return labels[lifestyle];
}

function getExerciseLevelLabel(level: ExerciseLevel): string {
  const labels: Record<ExerciseLevel, string> = {
    BEGINNER: "입문자",
    INTERMEDIATE_1_3: "1~3년차 헬린이",
    INTERMEDIATE_3_5: "3~5년차 중급자",
    ADVANCED: "5년차 이상 헬창",
    EXPERT: "10년차 이상 관장",
  };
  return labels[level];
}

function getExerciseFrequencyLabel(freq: ExerciseFrequency): string {
  const labels: Record<ExerciseFrequency, string> = {
    NONE: "전혀 안함",
    ONCE_WEEKLY: "주 1회",
    TWICE_WEEKLY: "주 2회",
    THRICE_WEEKLY: "주 3회",
    FOUR_WEEKLY: "주 4회",
    FIVE_WEEKLY: "주 5회",
    SIX_WEEKLY: "주 6회",
    DAILY: "매일 (주 7회)",
  };
  return labels[freq];
}

function getHealthLevelLabel(level: HealthLevel): string {
  const labels: Record<HealthLevel, string> = {
    VERY_GOOD: "매우 좋음 - 풀코스(42km) 달리기 완주 가능",
    GOOD: "좋음 - 하프코스(21km) 달리기 완주 가능",
    ABOVE_AVERAGE: "평균 이상 - 10km 달리기 완주 가능",
    AVERAGE: "평균 - 5km 달리기 가능",
    BELOW_AVERAGE: "평균 이하 - 달리면 힘들어요",
    POOR: "나쁨 - 못 달리겠어요",
    VERY_POOR: "매우 나쁨 - 걷지도 못하겠어요",
  };
  return labels[level];
}
