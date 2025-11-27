/**
 * 콘텐츠 분석 유틸리티 함수
 */

/**
 * 콘텐츠의 예상 읽기 시간을 계산합니다.
 * - 영문: 200단어/분
 * - 한글: 500자/분
 *
 * @param content - 분석할 콘텐츠 텍스트
 * @returns 예상 읽기 시간(분)
 */
export const calculateReadingTime = (content: string): number => {
  const words = content.split(/\s+/).length;
  const koreanChars = (content.match(/[\uac00-\ud7af]/g) || []).length;
  return Math.ceil((words / 200 + koreanChars / 500) / 2);
};

/**
 * 콘텐츠의 공백을 제외한 실제 길이를 계산합니다.
 *
 * @param content - 분석할 콘텐츠 텍스트
 * @returns 공백 제외 문자 수
 */
export const calculateContentLength = (content: string): number => {
  return content.replace(/\s/g, '').length;
};
