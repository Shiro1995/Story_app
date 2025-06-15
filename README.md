# 📱 HackerNews React Native App

A simple Hacker News reader built with React Native (without Expo).  
Supports viewing **top/new/best stories**, **story details**, and **comments** — using the official [Hacker News API](https://github.com/HackerNews/API).

---

## ✨ Features

- 🔥 View **Top**, **New**, and **Best** stories
- 📝 Story **details** with comments
- 🚀 **Pagination** & optimized rendering using `FlatList` & `React.memo`
- 🧪 **Unit tests** with `Jest`
- 🧩 Clean architecture: `api`, `screens`, `components`, `types`

---

## 📸 Screenshots

<!-- Add real screenshots later -->
<p float="left">
  <img src="./screenshots/home.png" width="200"/>
  <img src="./screenshots/detail.png" width="200"/>
</p>

---
## 🛠️ Getting Started
<summary><strong>▶️ Run the App</strong></summary>

### Android

```bash
yarn android
```

### iOS
```bash
cd ios && pod install && cd ..
yarn ios
```


<summary><strong>🧪 Running Tests</strong></summary>

```bash
yarn test
```

## 📁 Project Structure

```bash
__tests__/   # Unit tests
src/
├── api/         # API layer (fetch Hacker News data)
├── components/  # Reusable UI components
├── screens/     # HomeScreen, DetailScreen, TabViews
├── types/       # TypeScript types
├── utils/       # Utility functions
```
## 🌸 Technical Highlights

- **FlatList** for performance with large data sets  
- **React.memo** & `useCallback` to reduce unnecessary renders  
- **TabView** with custom scene rendering  
- **Manual comment threading** (based on `parent` id)  
- **Depth calculation** for nested comment rendering  
- **Separation of concerns** — clean and testable code

---

## 🧠 Performance Optimization

- Paginated story loading (`loadMore`)  
- Memoized components  
- Conditional re-rendering  

## 👨‍💻 Author

**Lap Tran**  
Mobile Developer | React Native | iOS  
[GitHub](https://github.com/your-username)

---

## 📝 License

This project is licensed under the MIT License.

---

## 🔗 References

- 📰 [Hacker News API](https://github.com/HackerNews/API)  
- 📘 [React Native Docs](https://reactnative.dev/docs/getting-started)  
- 🧪 [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)



