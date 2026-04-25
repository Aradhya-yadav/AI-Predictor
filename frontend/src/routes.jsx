<Routes location={location} key={location.pathname}>

  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
  <Route path="/predict" element={<PageWrapper><Predict /></PageWrapper>} />
  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />

  {/* 👇 YE YAHAN ADD KARO */}
  <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
  <Route path="/result" element={<PageWrapper><Result /></PageWrapper>} />

  {/* 🔐 Protected */}
  <Route 
    path="/profile" 
    element={
      <Protected>
        <PageWrapper><Profile /></PageWrapper>
      </Protected>
    } 
  />

</Routes>