
import { useEffect, useRef, useState } from "react";
import { useActiveDevices } from "../hooks/useActiveDevices";
import { useWindowResize } from "../hooks/useWindowResize";
import { select, selectAll, Selection } from "d3-selection";
import { Timer, timer } from 'd3-timer'
var t0 = Date.now();
export const Orbit = () => {

  const svgRef = useRef(null);
  const [selection, setSelection] = useState<null | Selection<null, unknown, null, undefined>>(null)
  const devices = useActiveDevices()
  const { width, height } = useWindowResize();
  const h = height - 100, w = h * 1.5;
  const r = h / 2 - 50;
  let l = devices.length;
  const data = devices.map((_, i) => ({ R: r, r: 25, speed: 2, phi0: i * 10 }));

  const textData = [
    { x: w / 2, y: h / 2, text: l.toString() },
    { x: w / 2 - 30, y: h / 2 + 30, text: l > 1 ? "DEVICES" : "DEVICE" },
    { x: w / 2 - 30, y: h / 2 + 60, text: "ONLINE" }
  ];


  useEffect(() => {
    let transitionTimer: Timer | null = null;
    if (!selection) {
      setSelection(select(svgRef.current))
    } else {
      selection.attr("width", w).attr("height", h);

      const texts = selection

        .selectAll('text')
        .data(textData)
        .attr("y", d => d.y)
        .attr("x", d => d.x)
        .text(d => d.text)
        .style("font-size", "24px")
        .style('fill', 'white');

      texts.enter()
        .append('text')
        .attr("y", (d: any) => d.y)
        .attr("x", (d: any) => d.x)
        .text((d: any) => d.text)
        .style("font-size", "24px")
        .style('fill', 'white');

      texts.exit().remove();

      let container: null | Selection<SVGGElement, unknown, null, undefined> = selection.select("g.main");

      if (!container.size()) {
        container = selection.append("g").attr("class", "main");
      }
      container.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")

      const planets = container.selectAll("g.planet").data(data);
      planets.exit().remove();

      planets.enter().append("g").attr("class", "planet").append("circle")
        .attr("r", (d: any) => d.r)
        .attr("cx", (d: any) => d.R)
        .attr("cy", 0)
        .attr("fill", "white");


      timer(function () {
        var delta = (Date.now() - t0);
        container?.selectAll("g.planet").attr("transform", function (d: any) {
          return "rotate(" + d.phi0 + delta * d.speed / 200 + ")";
        });
      });

    }
    return () => {
      transitionTimer?.stop();
      console.log('transitionTimer stopped');
    }
  }, [selection, width, height, l]);

  return (<div><svg ref={svgRef}></svg></div>)
}

