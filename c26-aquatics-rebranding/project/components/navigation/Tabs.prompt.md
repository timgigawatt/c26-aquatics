Pill segment control for audience/age selectors. Active pill fills navy.

```jsx
<Tabs
  items={[{id:"kids",label:"Kids"},{id:"teens",label:"Teens"},{id:"adults",label:"Adults"}]}
  defaultValue="kids"
  onChange={(id) => setSegment(id)}
/>
```

Controlled via `value`+`onChange`, or uncontrolled via `defaultValue`.
