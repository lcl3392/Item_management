import React, { useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Carlist from "./Carlist";
import Productlist from "./Productlist";
import Ownerlist from "./Ownerlist";
import SaveOwner from "./SaveOwner";
import Test from "../pages/Test";

const MenuBar = () => {
  const [selectedNode, setSelectedNode] = useState(null);  //현재 선택된 메뉴 아이템을 추적

  //nodeId를 받아와서 setSelectedNode 함수를 통해 selectedNode 상태를 업데이트
  const handleNodeClick = (nodeId) => {
    setSelectedNode(nodeId);
  };

  return (
    <div>
      <div style={{ height: "70px", width: "200px", border: "2px solid black", borderRadius:"10px",margin:"30px 0 30px 30px"}}>
      <h2>Menu</h2>
      </div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 650, maxWidth: 250, overflowY: "auto" }}
      >
        {/* nodeId는 각 아이템의 고유한 식별자 */}
        <TreeItem nodeId="1" label="Car">
          <TreeItem nodeId="2" label="Car list" onClick={() => handleNodeClick("carlist")} />
          <TreeItem nodeId="6" label="Owner">
              <TreeItem nodeId="8" label="Owner list" onClick={() => handleNodeClick("ownerlist")} />
            </TreeItem>
        </TreeItem>
        <TreeItem nodeId="5" label="관리대장">
            <TreeItem nodeId="9" label="품목관리" onClick={() => handleNodeClick("productlist")} />
            <TreeItem nodeId="10" label="품질관리" onClick={() => handleNodeClick("test")} />
          </TreeItem>
      </TreeView>
      {/*selectedNode가 "carlist"일 때, Carlist 컴포넌트를 렌더링 */}
      {selectedNode === "carlist" && <Carlist />}
      {selectedNode === "productlist" && <Productlist />}
      {selectedNode === "Save" && <SaveOwner />}
      {selectedNode === "ownerlist" && <Ownerlist />}
      {selectedNode === "test" && <Test />}
    </div>
  );
};

export default MenuBar;
