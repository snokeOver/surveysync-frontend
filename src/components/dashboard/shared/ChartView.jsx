import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const ChartView = ({ userStatistics }) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data = Object.entries(userStatistics).map(([key, value]) => ({
    name: key,
    uv: value, // or use any other property name you prefer
    pv: 0, // if you don't need these properties, set them to a default value or remove them
    amt: 0, // same as above
  }));

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
   ${x + width / 2}, ${y}
   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
   Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="flex items-center justify-center">
      <BarChart
        width={1000}
        height={600}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="uv"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default ChartView;
