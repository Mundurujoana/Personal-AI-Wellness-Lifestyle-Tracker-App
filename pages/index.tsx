import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import ProgressRing from "@/components/ProgressRing"; 



// Simple ProfileCard component
function ProfileCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center bg-pink-50 border border-pink-200 rounded-2xl p-4 w-36 shadow-sm">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-lg font-semibold text-pink-600">{value}</span>
    </div>
  );
}

export default function DashboardPage() {
  const profile = {
    name: "Munduru Joana",
    email: "joana@example.com",
  };

  const [activeTab, setActiveTab] = useState("Body");

  const [sleepHours, setSleepHours] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [weight, setWeight] = useState("");

  const [mood, setMood] = useState("Happy");
  const [stressLevel, setStressLevel] = useState("");
  const [focusLevel, setFocusLevel] = useState("");

  const [screenTime, setScreenTime] = useState("");
  const [activityMinutes, setActivityMinutes] = useState("");
  const [mealsTaken, setMealsTaken] = useState("");
  const [startIndex, setStartIndex] = useState(0);
const visibleCount = 3;


  // SHOWS REALTIME CUURENCT TIME 
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const weekday = currentTime.toLocaleDateString("en-US", { weekday: "long" });

  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 18
      ? "Good Afternoon"
      : "Good Evening";



  // QUOTE POP UP TOAST 
  //  Quotes and Toast State
  const [quotes, setQuotes] = useState<string[]>([
    "Stay positive, stay focused — your best days are ahead! ✨",
    "Keep going, you're doing great!",
    "Every step forward is progress.",
  ]);
  const [toastQuote, setToastQuote] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Fetch quotes from API once on mount
  useEffect(() => {
    fetch("https://zenquotes.io/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        // Extract quotes from API response (array of objects with q and a)
        const fetchedQuotes = data.slice(0, 10).map(
          (item: any) => `${item.q} — ${item.a}`
        );
        setQuotes(fetchedQuotes);
      })
      .catch(() => {
        // Use default quotes on error (already set)
      });
  }, []);

  // Show toast every 10-15 seconds randomly with a random quote
  useEffect(() => {
    const showRandomToast = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setToastQuote(quotes[randomIndex]);
      setShowToast(true);

      // Hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    };

    // Initial toast after 3 seconds
    const initialTimeout = setTimeout(showRandomToast, 3000);

    // Repeat interval every 10-15 seconds randomly
    const interval = setInterval(() => {
      showRandomToast();
    }, 10000 + Math.random() * 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [quotes]);


  //PROGRESS RING FOR HABIT TRACKER
  //  Map moods to scores
const moodScores: Record<string, number> = {
  Happy: 100,
  Neutral: 60,
  Sad: 20,
  Stressed: 10,
  Excited: 90,
};

// Calculate progress values safely
const moodProgress = moodScores[mood] ?? 0;

const sleepTarget = 8;
const sleepProgress = sleepHours ? Math.min((parseFloat(sleepHours) / sleepTarget) * 100, 100) : 0;

const waterTarget = 8;
const waterProgress = waterIntake ? Math.min((parseFloat(waterIntake) / waterTarget) * 100, 100) : 0;

const progressData = [
  { progress: moodProgress, color: "#EC4899", label: "Mood", value: mood },
  { progress: sleepProgress, color: "#8B5CF6", label: "Sleep (hrs)", value: sleepHours || 0, unit: "h" },
  { progress: waterProgress, color: "#3B82F6", label: "Water", value: waterIntake || 0, unit: "gl" },
  { progress: 60, color: "#F59E0B", label: "Weight", value: weight || 0, unit: "kg" },
  { progress: 30, color: "#EF4444", label: "Stress", value: stressLevel || 0 },
  { progress: 70, color: "#10B981", label: "Focus", value: focusLevel || 0 },
  { progress: 40, color: "#6366F1", label: "Screen Time", value: screenTime || 0, unit: "h" },
  { progress: 80, color: "#F97316", label: "Activity", value: activityMinutes || 0, unit: "min" },
  { progress: 50, color: "#14B8A6", label: "Meals", value: mealsTaken || 0 },
];




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your entries have been saved! ✨");
  };

  const sleepData = [
    { day: "Mon", hours: 7 }, { day: "Tue", hours: 6 },{ day: "Wed", hours: 8 },{ day: "Thu", hours: 5 },{ day: "Fri", hours: 7.5 },{ day: "Sat", hours: 9 }, { day: "Sun", hours: 8 },
  ];

  const moodData = [{ day: "Mon", mood: 4 },{ day: "Tue", mood: 3 },{ day: "Wed", mood: 5 },{ day: "Thu", mood: 2 },{ day: "Fri", mood: 4 },{ day: "Sat", mood: 5 }, { day: "Sun", mood: 4 },
  ];

  const screenData = [ { day: "Mon", time: 4 },{ day: "Tue", time: 5 },{ day: "Wed", time: 3 },{ day: "Thu", time: 6 }, { day: "Fri", time: 4 },{ day: "Sat", time: 2 }, { day: "Sun", time: 3 },
  ];

  return (
   <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-6 relative font-poppins">
      {/* Toast Notification */}
      {showToast && toastQuote && (
        <div className="fixed bottom-8 right-8 bg-pink-600 text-white px-6 py-4 rounded-2xl shadow-lg animate-fadeInOut max-w-xs font-semibold italic drop-shadow-lg z-50">
          {toastQuote}
        </div>
      )}



<div
  title={profile.name}
  className="absolute top-6 right-8 flex items-center justify-center w-10 h-10 rounded-full bg-pink-600 text-white text-lg font-extrabold shadow-lg ring-4 ring-pink-400 cursor-pointer select-none"
>
  {profile.name === "Munduru Joana" ? "MJ" : "U"}
</div>

<header className="mb-10 max-w-3xl mx-auto text-center pt-8">
  <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2 font-poppins">
    Joana, Your Wellness Dashboard 🌿
  </h1>
  <p className="text-pink-200 text-lg font-medium drop-shadow-md">
    Track and reflect on your daily habits to stay balanced and healthy.
  </p>
<div className="text-pink-100 font-medium text-lg mt-4 drop-shadow-sm italic">
  {greeting}, {profile.name.split(" ")[1]}! ☀️ It’s {weekday}, {hours}:{minutes}.
</div>
</header>



      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6 max-w-3xl mx-auto">
        {["Body", "Mind", "Lifestyle"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeTab === tab
                ? "bg-pink-500 text-white"
                : "bg-pink-50 text-pink-600 hover:bg-pink-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 mb-12"
      >
        {activeTab === "Body" && (
          <>
            <HabitInput label="😴 Sleep (hours)" value={sleepHours} setValue={setSleepHours} />
            <HabitInput label="💧 Water Intake (glasses)" value={waterIntake} setValue={setWaterIntake} />
            <HabitInput label="⚖️ Weight (kg)" value={weight} setValue={setWeight} />
          </>
        )}

        {activeTab === "Mind" && (
          <>
            <div className="flex flex-col gap-2 bg-pink-50 p-4 rounded-2xl shadow-sm">
              <label className="font-semibold text-pink-600">😊 Mood</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-3"
              >
                {["Happy", "Neutral", "Sad", "Stressed", "Excited"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <HabitInput label="😖 Stress Level (1-5)" value={stressLevel} setValue={setStressLevel} />
            <HabitInput label="🧠 Focus Level (1-5)" value={focusLevel} setValue={setFocusLevel} />
          </>
        )}

        {activeTab === "Lifestyle" && (
          <>
            <HabitInput label="📱 Screen Time (hours)" value={screenTime} setValue={setScreenTime} />
            <HabitInput label="🏃‍♀️ Physical Activity (minutes)" value={activityMinutes} setValue={setActivityMinutes} />
            <HabitInput label="🍽️ Meals Taken" value={mealsTaken} setValue={setMealsTaken} />
          </>
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-400 to-pink-600 text-white py-3 rounded-full hover:from-pink-500 hover:to-pink-700 col-span-full"
        >
          Save Entry ✨
        </button>
      </form>

<section className="flex items-center justify-center gap-6 max-w-6xl mx-auto mb-20">
  <button
    onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))}
    disabled={startIndex === 0}
    className="text-white text-4xl disabled:opacity-30"
  >
    &#8592;
  </button>

  <div className="flex gap-8 items-center">
    {progressData.slice(startIndex, startIndex + visibleCount).map((item, index) => (
      <ProgressRing
        key={index}
        radius={90}       // <- increased from 60 to 80
        stroke={15}       // <- thicker stroke
        progress={item.progress}
        color={item.color}
        label={item.label}
        value={item.value}
        unit={item.unit}
      />
    ))}
  </div>

  <button
    onClick={() =>
      setStartIndex((prev) =>
        Math.min(prev + 1, progressData.length - visibleCount)
      )
    }
    disabled={startIndex + visibleCount >= progressData.length}
    className="text-white text-4xl disabled:opacity-30"
  >
    &#8594;
  </button>
</section>



      {/* Charts */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <ChartCard title="Sleep Hours" chart={
          <LineChartComponent data={sleepData} />
        } />
        <ChartCard title="Mood Score" chart={
          <BarChartComponent data={moodData} />
        } />
        <ChartCard title="Screen Time (hrs)" chart={
          <AreaChartComponent data={screenData} />
        } />
      </section>
    </div>
  );
}

// Reusable Habit Input component
function HabitInput({ label, value, setValue }: any) {
  return (
    <div className="flex flex-col gap-2 bg-pink-50 p-4 rounded-2xl shadow-sm">
      <label className="font-semibold text-pink-600">{label}</label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-300 rounded-full px-4 py-3"
        required
      />
    </div>
  );
}

// ChartCard no longer wraps ResponsiveContainer
function ChartCard({ title, chart }: any) {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-md">
      <h2 className="text-lg font-semibold text-pink-600 mb-2">{title}</h2>
      {chart}
    </div>
  );
}

// Chart components with ResponsiveContainer inside DashboardPage
function LineChartComponent({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="hours" stroke="#EC4899" strokeWidth={2} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

function BarChartComponent({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <Bar dataKey="mood" fill="#F472B6" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}

function AreaChartComponent({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <Area type="monotone" dataKey="time" stroke="#F9A8D4" fill="#FBCFE8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}
