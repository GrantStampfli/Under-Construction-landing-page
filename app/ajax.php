<?php
class FRAMEWORK {
  public $_SQL = NULL;
  public $_DESCRIPTION = NULL;
  public $_KEYWORDS = NULL;
  public $_AUTHOR = NULL;
  public $_TITLE = NULL;
  
  public function session() {
    session_set_cookie_params(0);
    session_start();
    return (0);
  }
  
  public function check() {
    $sql["ip"] = $this->secure($_SERVER["REMOTE_ADDR"]);
    $sql["browser"] = $this->secure($_SERVER["HTTP_USER_AGENT"]);
    $sql["path"] = $this->secure($_SERVER["REQUEST_URI"]);
    $sql["method"] = $this->secure($_SERVER["REQUEST_METHOD"]);
    $sql["date"] = $this->secure(gmdate("Y-m-d H:i:s"));
    $sql["uptodate"] = $this->secure(gmdate("Y-m-d H:i:s"));
    $sql["flag"] = $this->secure(0);
    $result = $this->database("INSERT INTO logs VALUES (
      '',
      '".$sql["ip"]."',
      '".$sql["browser"]."',
      '".$sql["path"]."',
      '".$sql["method"]."',
      '".$sql["date"]."',
      '".$sql["uptodate"]."',
      '".$sql["flag"]."'
    )");
    $result = $this->database("SELECT * FROM pages WHERE flag IN (0)");
    while (($row = mysqli_fetch_array($result))) {
      if (strstr(current(explode("?", $_SERVER["REQUEST_URI"])), $row["path"])) {
        $this->_DESCRIPTION = $row["description"];
        $this->_KEYWORDS = $row["keywords"];
        $this->_AUTHOR = $row["author"];
        $this->_TITLE = $row["title"];
      }
    }
    return (0);
  }
  
  public function redirect($url) {
    exit(header("Location: ".$url));
    return (0);
  }
  
  public function format($date) {
    $date = gmdate("F", strtotime($date))." ".gmdate("d", strtotime($date)).", ".gmdate("Y", strtotime($date));
    return ($date);
  }
  
  public function json($data) {
    if (gettype($data) == "string") {
      return (json_decode($data, TRUE));
    }
    if (gettype($data) == "array") {
      return (json_encode($data));
    }
    return (NULL);
  }
  
  public function secure($data) {
    $db = mysqli_connect($this->_SQL["host"], $this->_SQL["user"], $this->_SQL["pass"], $this->_SQL["name"]);
    $result = mysqli_query($db, "SET NAMES 'UTF8'");
    $result = mysqli_real_escape_string($db, stripslashes($data));
    mysqli_close($db);
    return ($result);
  }
  
  public function database($data) {
    $db = mysqli_connect($this->_SQL["host"], $this->_SQL["user"], $this->_SQL["pass"], $this->_SQL["name"]);
    $result = mysqli_query($db, "SET NAMES 'UTF8'");
    $result = mysqli_query($db, $data);
    mysqli_close($db);
    return ($result);
  }
  
  public function fn($func, $a = NULL, $b = NULL, $c = NULL, $d = NULL) {
    return ($a ? $b ? $c ? $d ? $func($a, $b, $c, $d) : $func($a, $b, $c) : $func($a, $b) : $func($a) : $func());
  }
}

$_FRAMEWORK = new FRAMEWORK();
?>